import { checkVerificationCode, sendVerificationCode, temporaryPassword } from "@/lib/api"

export const useFindPassword = () => {
    //인증코드 전송
    const sendCode = async (email: string) => {
        try {
            await sendVerificationCode(email)
        } catch (e) {
            console.error("인증코드 발송이 되지 않았습니다.", e)
        }
    }
    //인증코드 확인
    const verifyCode = async (email: string, code: string) => {
        try {
            await checkVerificationCode(email, code)
        } catch (e) {
            console.error("인증코드를 확인해주세요", e)
        }
    }

    const temporaryPassword = async(email:string)=>{
        try {
            await temporaryPassword(email)
          } catch (e) {
            console.error("인증코드를 확인해주세요", e)
          } 
    };

    return {sendCode, verifyCode, temporaryPassword};
};