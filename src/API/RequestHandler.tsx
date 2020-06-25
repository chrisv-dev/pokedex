export default class RequestHandler{
    static async get(url:string ){
        const response = await fetch(url, {method: 'GET'});
        if (response.status === 200) {
            return await response.json();
        } else {
            // TODO: show helpful msgs for various 4xx error msgs
            if(response.status >= 500){
                // TODO: show msg to user that there is a problem on serverside
            }
        }
    }    
}