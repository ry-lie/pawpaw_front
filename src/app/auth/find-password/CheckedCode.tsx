import { useForm, useWatch } from "react-hook-form";
import { useFindPassword } from "./useFindPassword";

interface codeInput {
  code: string;
}

export default function checkedCode() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<codeInput>({
    mode: "onChange",
  });

  const code = useWatch({
    control,
    name: "code",
  });

  const checkCode = !code || Object.keys(errors).length > 0;

  const { verifyCodeCheck } = useFindPassword();

  const onSubmitofCode = async (data: codeInput) => {
    try {
      const result = await verifyCodeCheck(data.email, data.code);
      if (result.success) {
        successToast("인증번호가 확인되었습니다.");
      }
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        errorToast(
          e.response?.data?.message || "서버에 문제가 발생하였습니다.",
        );
      }
    }
  };
}
