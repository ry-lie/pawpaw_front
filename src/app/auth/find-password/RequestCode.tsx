import { useForm, useWatch } from "react-hook-form";
import { useFindPassword } from "./useFindPassword";
import { errorToast, infoToast } from "@/utils/Toast";
import { isAxiosError } from "axios";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface emailInput {
  email: string;
}

export default function requestCode() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<emailInput>({
    mode: "onChange",
  });

  const email = useWatch({
    control,
    name: "email",
  });

  const checkEmail = !email || Object.keys(errors).length > 0;

  const { sendCode } = useFindPassword();

  const onSubmitOfRequest = async (data: emailInput) => {
    try {
      if (!data.email) {
        await sendCode(data.email);
        infoToast("인증번호가 이메일로 전송되었습니다.");
      }
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        errorToast(
          e.response?.data?.message || "서버에 문제가 발생하였습니다.",
        );
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitOfRequest)}>
      <Input
        label="이메일"
        type="email"
        placeholder="abc@abc.com"
        className="w-80 mt-2"
        {...register("email", {
          required: "이메일은 필수 입력 항목입니다.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "유효한 이메일 주소를 입력하세요",
          },
        })}
        errorMessage={errors.email?.message}
      >
        <Button btnType="submit" containerStyles="mt-2" disabled={checkEmail}>
          요청
        </Button>
      </Input>
    </form>
  );
}
