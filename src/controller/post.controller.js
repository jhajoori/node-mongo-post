const { CreateErrorResponse, CreateSuccessResponse,CreateInternalErrorResponse } = require("../helper/response.helper");
const Post = require("../model/post.model")
const User = require("../model/user.model")

const createPost = async (req,res) => {
    try {
            const { title, body, latitude, longitude } = req.body;

            if(!title || !body || !latitude || !longitude){
                return res
                .status(400)
                .json(CreateErrorResponse("Please share proper values!","Invalid"));
            }

            const createdBy = req.user._id;
            const post = await Post.create({ title, body, location: { latitude, longitude }, createdBy });
            req.user.posts.push(post);
            await req.user.save();
            return res.status(201).json(CreateSuccessResponse('Post created successfully'));
   
    } catch (error) {
        console.log(error)
        return res.status(500).json(CreateInternalErrorResponse())
    }
}

const getAllPost = async (req,res) => {
    try {
        const user = await User.findById(req.user._id).populate('posts');
        return res
        .status(200)
        .json(CreateSuccessResponse("Data fetched successfully!",  user.posts ));
      } catch (err) {
        return res.status(500).json(CreateInternalErrorResponse())

      }
}

const getPostById = async (req,res) => {
    try {
        const { postId } = req.params;

        if(!postId){
            return res
            .status(400)
            .json(CreateErrorResponse("Improper post data!","Invalid"));
        }

        const post = await Post.findById(postId);

        if(!post){
            return res
            .status(400)
            .json(CreateErrorResponse("Invalid post ID!","Invalid"));
        }
    
        return res.status(200).json(CreateSuccessResponse('Post found successfully', post));
      } catch (error) {

        return res.status(500).json(CreateInternalErrorResponse())
      }
}


const updatePost = async (req,res) => {
    try {
        const { title, body, active, latitude, longitude } = req.body;
        const { postId } = req.params;

        if(!postId){
            return res
            .status(400)
            .json(CreateErrorResponse("Improper post data!","Invalid"));
        }

        const post = await Post.findById(postId);

        if(!post){
            return res
            .status(400)
            .json(CreateErrorResponse("Invalid post ID!","Invalid"));
        }
    
        if (post.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json(CreateErrorResponse("Unauthorized Action!",'Unauthorized'));
        }
    
        post.title = title ?? post.title;
        post.body = body ?? post.body;
        post.active = active ?? post.active;
        post.location.latitude = latitude ?? post.location.latitude;
        post.location.longitude = longitude ?? post.location.longitude;
        await post.save();

        return res.status(200).json(CreateSuccessResponse('Post updated successfully'));
      } catch (error) {
        console.log(error)

        return res.status(500).json(CreateInternalErrorResponse())
      }
}

const deletePost = async (req,res) => {
    try {
        const { postId } = req.params;

        if(!postId){
            return res
            .status(400)
            .json(CreateErrorResponse("Improper post data!","Invalid"));
        }

        const post = await Post.findById(postId);
    
        if (post.createdBy.toString() !== req.user._id.toString()) {
          return res.status(403).json(CreateErrorResponse("Unauthorized Action!",'Unauthorized'));
        }
    
        await Post.findByIdAndDelete(postId);

        return res.status(200).json(CreateSuccessResponse('Post deleted successfully'));

      } catch (err) {
        return res.status(500).json(CreateInternalErrorResponse())

      }
}

const getPostByLatLong = async (req,res) => {
    try {
        const { latitude, longitude } = req.body;
        const radius = 10000; // 10 KM

        if( !latitude || !longitude){
            return res
            .status(400)
            .json(CreateErrorResponse("Please share proper values!","Invalid"));
        }

    
        const posts = await Post.find({
          location: {
            $geoWithin: {
              $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], radius / 3963.2],
            },
          },
        });
    
        if (posts.length > 0) 
        return res.status(200).json(CreateSuccessResponse('Data found successfully!', posts));
        else
        return res.status(200).json(CreateSuccessResponse('No data found!'));


      } catch (err) {
        return res.status(500).json(CreateInternalErrorResponse())
      }
}

const getActiveInActivePosts = async (req,res) => {
    try {
        const posts = await Post.find();

        const activePost = posts.map(post => post.active == true);
        const inActivePost = posts.map(post => post.active == false);

        return res
        .status(200)
        .json(CreateSuccessResponse("Data fetched successfully!",  {active : activePost.length, inActive : inActivePost.length } ));
      } catch (err) {
        return res.status(500).json(CreateInternalErrorResponse())

      }
}


module.exports = {
    createPost,
    getAllPost,
    updatePost,
    deletePost,
    getPostByLatLong,
    getActiveInActivePosts,
    getPostById
}