import { useRef } from 'react';
import './SupportTicket.css'
import toast from 'react-hot-toast';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';

function SupportTicket() {

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm(`${import.meta.env.VITE_SERVICE_ID}`, `${import.meta.env.VITE_TEMPLATE_ID}`, form.current, `${import.meta.env.VITE_PUBLIC_KEY}`)
        .then((result) => {
            console.log(result.text);
            e.target.reset()
            toast.success('Message Sent Successful')
        }, (error) => {
            console.log(error.text);
            toast.error('Unable to send Messages')
        });
    };

  return (
    <form className='supportTicket' ref={form} onSubmit={sendEmail}>
        <h2 className='title'>Have a question, problem? reach out to us</h2>
        <div className="input-group">
            <label for='name' className='c-label' ><PersonIcon className='icon' /> Your Name</label>
            <input required type="text" id='name' name='user_name' />
        </div>

        <div className="input-group">
            <label for='number' className='c-label'><PhoneIcon className='icon' /> Phone No.</label>
            <input required type="number" id='number' name='user_phone' />
        </div>

        <div className="input-group">
            <label for='email' className='c-label'><EmailIcon className='icon' /> Email Address</label>
            <input required type="email" id='email' name='user_email' />
        </div>

        <div className="input-group">
            <label for='message' className='c-label'><ChatBubbleIcon className='icon' /> Your Message</label>
            <textarea required rows="8" id='message' name='message'></textarea>
        </div>
        <button className='btn' type="submit">Submit  <SendIcon className='icon' /></button>
    </form>
  )
}

export default SupportTicket