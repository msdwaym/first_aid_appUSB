import { request } from "@/util/request"
export function addFeedbackInfo(data) {
    return request({
		url:'assistance/addAssistance',
		method:'GET',
		data:data
	})
}