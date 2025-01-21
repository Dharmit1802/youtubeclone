import User from "../Models/User.js";
import Video from "../Models/Video.js";

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json({
            status: 200,
            message: savedVideo
        })
    } catch (error) {
        next(error);
    }
}
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.json("video not found !!")
        if (req.user.id === video.userId) {
            const UpdatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {
                new: true
            })
            res.status(200).json({
                status: 200,
                message: UpdatedVideo
            })
        } else {
            return res.json("you can update only your video!!");
        }
    } catch (error) {
        next(error);
    }
}
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.json("video not found !!")
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("video has been deleted sucessfully!")
        } else {
            return res.json("you can delete only your video!!");
        }
    } catch (error) {
        next(error);
    }
}
export const getVideo = async (req, res, next) => {
    try {
        // Find the video by ID
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json("Video not found!");

        res.status(200).json(video);
    } catch (error) {
        next(error.message);
    }
}

export const savetoHistory = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json("User not found");

        await User.findByIdAndUpdate(req.user.id, {
            $addToSet: { history: req.params.id }
        });

        res.status(200).json("video added");
    } catch (error) {
        next(error.message)
    }
}

export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        });
        res.status(200).json("The view has been increased")
    } catch (error) {
        next(error);
    }
}

export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{
            $sample:
                { size: 40 }
        }]);
        res.status(200).json(videos)
    } catch (error) {
        next(error);
    }
}

export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (error) {
        next(error);
    }
}

export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        const subscribedChannel = user.subscribedUser;
        const list = await Promise.all(subscribedChannel.map((channelId) => {
            return Video.find({ userId: channelId });
        }));


        res.status(200).json(list.flat());

    } catch (error) {
        next(error);
    }
}

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",")
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos)
    } catch (error) {
        next(error);
    }
}

export const search = async (req, res, next) => {
    const query = req.query.q
    try {
        const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40);
        res.status(200).json(videos)
    } catch (error) {
        next(error);
    }
}