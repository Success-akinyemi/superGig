import { useEffect, useRef, useState } from 'react';
import './SubmitTaskForm.css'
import TestImg from '../../../assets/6.png'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../../firebase';
import toast from 'react-hot-toast';
import { submitTask } from '../../../helpers/helpers';
import { useNavigate } from 'react-router-dom';

function SubmitTaskForm({userProfile, taskId, userId}) {
  const navigate = useNavigate()
  //console.log('task info', userProfile, taskId, userId)
  const [image, setImage] = useState(undefined);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false) 

  const fileRef = useRef(null);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setImageUploadProgress(Math.round(progress));
      },
      (error) => {
        //console.log('ERROR', error)
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, proofImg: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    setFormData({...formData, userProfile, taskId, userId})
  }, [userProfile, taskId, userId])

  const handleSubmitTask = async () => {
    try {
      if(!formData.proofImg){
        toast.error('Upload job screenshot')
      }
      setIsLoading(true)
      const res = await submitTask(formData)
      if(res.data.success){
        navigate('/home')
      }
      console.log('task id',formData)
    } catch (error) {
      console.log('FAILED  TO SUBMIT TASK', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='submitTaskForm'>
        <p>Submit Task Form</p>
        <h4>Platform: {}</h4>
        <div className="inputGroup">
          <h5>Username:</h5>
          <input type="text" value={userProfile} disabled/>
        </div>

        <div className="inputGroup screenShot">
          <h5>Upload ScreenShot:</h5>
          <input
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {
            formData.proofImg && (
              <img className='screenshootImg' src={TestImg} />
            )
          }

          <button onClick={() => fileRef.current.click()}>
            Upload Screenshot
          </button>

          <p className="">
          {imageError ? (
            <span className="textRed">
              Error Uploading Image (file size must be less than 2 MB)
            </span>
          ) : imageUploadProgress > 0 && imageUploadProgress < 100 ? (
            <span className="textGray">{`Uploading: ${imageUploadProgress}% complete`}</span>
          ) : imageUploadProgress === 100 ? (
            <span className="textGreen">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>

        </div>

        <div className="inputGroup">
          <button onClick={handleSubmitTask} disabled={!formData.proofImg || isLoading} className={`submit ${formData.proofImg ? 'ready' : ''} ${isLoading ? 'submit' : ''}`}>
            {isLoading ? 'Submitting...' : 'Submit Task'}
          </button>
        </div>
    </div>
  )
}

export default SubmitTaskForm