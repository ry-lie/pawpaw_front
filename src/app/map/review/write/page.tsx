import Button from "@/components/Button";
import Input from "@/components/Input";
import { RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";

export default function ReviewWritePage() {
  return (
    <div className="mt-14 px-4">
      <h1 className="text-lg font-semibold">리뷰 남기기</h1>
      <form action="submit" className="mt-4">
        <Input name="title" label="제목" className="w-full" />
        <label className="block text-md font-bold text-gray-700 mt-2">내용</label>
        <textarea
          name="description"
          className={`w-full border border-stroke_gray p-2 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm  resize-none h-96`}
          placeholder="내용을 입력하세요"
        />
        <div className="flex">
          <Button btnType="submit" containerStyles="text-[16px] font-medium ml-auto px-2 mt-2">작성</Button>
        </div>
      </form>

    </div>
  );
}