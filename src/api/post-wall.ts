import ajax from "@/common/ajax";
import {
    ResponseData,
    PostWallApi
} from "@/types"

const request =  ajax;


const addPost = (data: any) => request.post("/addPost", data) as Promise<ResponseData>;
const getPost = (data: any) => request.get("/getPost", data) as Promise<PostWallApi>;

export {
    addPost,
    getPost
}
