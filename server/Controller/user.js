import User from "../Models/User.js"
import Video from "../Models/Video.js";

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true })
            res.status(200).json({
                status: 200,
                message: updatedUser
            })
        } catch (error) {
            next(error);
        };

    } else {
        return res.status(400).json({
            status: 400,
            message: "you can update only your account!"
        })
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({
                status: 200,
                message: "User has been deleted"
            })
        } catch (error) {
            next(error);
        };

    } else {
        return res.status("400").json({
            status: 400,
            message: "you can delete only your account!"
        })
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (error) {
        next(error);
    }
};

export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUser: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        res.status(200).json({
            status: 200,
            message: "Successfully subscribed"
        })
    } catch (error) {
        next(error);
    }
};

export const getHistory = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const historys = user.history
        const list = await Promise.all(historys.map((videoId) => {
            return Video.findById(videoId);
        }));
        res.status(200).json(list.flat());
    } catch (error) {
        next(error.message);
    }
}

export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUser: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        });
        res.status(200).json({
            status: 200,
            message: "Successfully Unsubscribed"
        })
    } catch (error) {
        next(error);
    }
};

export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        });
        res.status(200).json("video is liked")

    } catch (error) {
        next(error);
    }
};

export const dislikes = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        });
        res.status(200).json("video is disliked")

    } catch (error) {
        next(error);
    }
};

export const views = async (req, res, next) => {
    try {
        const videoId = req.params.videoId;
        await Video.findByIdAndUpdate(videoId, {
            $inc: { views: 1 }
        })
        res.json("views increase")
    } catch (error) {
        next(error);
    }
}