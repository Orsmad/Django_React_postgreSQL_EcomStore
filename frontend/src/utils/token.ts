

export function getToken() {
    try{
            // @ts-ignore
    const token =JSON.parse(localStorage.getItem(["token"]) || "");
    return token
}catch{
    return false
}}

