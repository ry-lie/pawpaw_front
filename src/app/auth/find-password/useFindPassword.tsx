import { sendVerificationCode, temporaryPassword, verifyCode } from "@/lib/api/auth";

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
    const verifyCodeCheck = async (email: string, verificationCode: string) => {
        try {
            await verifyCode(email, verificationCode)
        } catch (e) {
            console.error("인증코드를 확인해주세요", e)
        }
    }
//인증코드 제출
    const temporaryPasswordSubmit = async (email: string) => {
        try {
            await temporaryPassword(email)
        } catch (e) {
            console.error("인증코드를 확인해주세요", e)
        }
    };

    return { sendCode, verifyCodeCheck, temporaryPasswordSubmit };
};