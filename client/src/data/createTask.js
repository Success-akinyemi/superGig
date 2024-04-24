export const selectCategory = [
    { category: 'Social Media Engagement', code: '1'} ,
    { category: 'Mobile', code: '2'}
]

export const selectAccountPlatform = [
    { taskCategoryCode: '1', platform: 'Instagram', code: '01'},
    { taskCategoryCode: '1', platform: 'Facebook', code: '02'},
    { taskCategoryCode: '1', platform: 'Twitter', code: '03'},
    { taskCategoryCode: '1', platform: 'Threads', code: '04'},
    { taskCategoryCode: '1', platform: 'Tiktok', code: '05'},
    { taskCategoryCode: '1', platform: 'Youtube', code: '06'},
    { taskCategoryCode: '1', platform: 'Telegram', code: '07'},
]

export const selectMobilePlatform = [
    { platform: 'Mobile', code: '01'},
]

export const InstagramTask = [
    { platformCode: '01', taskId: '101', task: 'Follow Instagram Account', pricePerFreelancer: 4, unitPrice: 9, minWorkers: 100 },
    { platformCode: '01', taskId: '102', task: 'Like instagram Post', pricePerFreelancer: 2, unitPrice: 5, minWorkers: 100 },
    { platformCode: '01', taskId: '103', task: 'Comment on Instagram Post', pricePerFreelancer: 4, unitPrice: 10, minWorkers: 50 },
    { platformCode: '01', taskId: '104', task: 'Wish a person happy birthday', pricePerFreelancer: 10, unitPrice: 30, minWorkers: 20 },
    { platformCode: '01', taskId: '105', task: 'Comment on Instagram reels post', pricePerFreelancer: 5, unitPrice: 15, minWorkers: 50 },
    { platformCode: '01', taskId: '106', task: 'Like Instagram reels post', pricePerFreelancer: 2, unitPrice: 4, minWorkers: 100 },
    { platformCode: '01', taskId: '107', task: 'Share to Instagram story', pricePerFreelancer: 10, unitPrice: 30, minWorkers: 20 },
    { platformCode: '01', taskId: '108', task: 'View Instagram story post', pricePerFreelancer: 6, unitPrice: 15, minWorkers: 50 },
]

export const FaceBookTask = [
    { platformCode: '02', taskId: '201', task: 'Like Facebook Post', pricePerFreelancer: 3, unitPrice: 5, minWorkers: 100 },
    { platformCode: '02', taskId: '202', task: 'Share Facebook Post', pricePerFreelancer: 4, unitPrice: 8, minWorkers: 100},
    { platformCode: '02', taskId: '203', task: 'Comment on Facebook Post', pricePerFreelancer: 4, unitPrice: 8, minWorkers: 100},
    { platformCode: '02', taskId: '204', task: 'Watch video', pricePerFreelancer: 6, unitPrice: 15, minWorkers: 50 },
    { platformCode: '02', taskId: '205', task: 'Follow Facebook Account', pricePerFreelancer: 4, unitPrice: 10, minWorkers: 100},
]

export const TwitterTask = [
    { platformCode: '03', taskId: '301', task: 'Follow Twitter Account' , pricePerFreelancer: 7, unitPrice: 15, minWorkers: 100},
    { platformCode: '03', taskId: '302', task: 'Retweet Post' , pricePerFreelancer: 4, unitPrice: 8, minWorkers: 100},
    { platformCode: '03', taskId: '303', task: 'Comment on Twitter Post' , pricePerFreelancer: 4, unitPrice: 10, minWorkers: 100},
]

export const ThreadsTask = [
    { platformCode: '04', taskId: '401', task: 'Follow Threads Account' , pricePerFreelancer: 7, unitPrice: 18, minWorkers: 50},
    { platformCode: '04', taskId: '402', task: 'Share Threads Post' , pricePerFreelancer: 4, unitPrice: 10, minWorkers: 100},
    { platformCode: '04', taskId: '403', task: 'Comment on Threads Post' , pricePerFreelancer: 5, unitPrice: 10, minWorkers: 100},
    { platformCode: '04', taskId: '404', task: 'Like Threads post', pricePerFreelancer: 3, unitPrice: 6, minWorkers: 100}
]

export const TiktokTask = [
    { platformCode: '05', taskId: '501', task: 'Follow Tiktok account', pricePerFreelancer: 6, unitPrice: 11},
    { platformCode: '05', taskId: '502', task: 'Comment on Tiktok video', pricePerFreelancer: 8, unitPrice: 15},
    { platformCode: '05', taskId: '503', task: 'Like Tiktok video', pricePerFreelancer: 3, unitPrice: 7},
    { platformCode: '05', taskId: '504', task: 'Share Tiktok Video', pricePerFreelancer: 10, unitPrice: 20}
]

export const YoutubeTask = [
    { platformCode: '06', taskId: '601', task: 'Comment on youtube video', pricePerFreelancer: 8, unitPrice: 18},
    { platformCode: '06', taskId: '602', task: 'Like Youtube video', pricePerFreelancer: 4, unitPrice: 8},
    { platformCode: '06', taskId: '603', task: 'Like a Youtube shorts video', pricePerFreelancer: 4, unitPrice: 8},  
    { platformCode: '06', taskId: '604', task: 'Premium comment on a video', pricePerFreelancer: 15, unitPrice: 35},
    { platformCode: '06', taskId: '605', task: 'Subscribe to Youtube channel', pricePerFreelancer: 10, unitPrice: 20}
]

export const TelegramTask = [
    { platformCode: '07', taskId: '701', task: 'Join Telegram channel', pricePerFreelancer: 12, unitPrice: 25},
]