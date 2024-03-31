import Wrapper from "../assets/stylingWrappers/InputFileUpload";
import { MdCloudUpload } from "react-icons/md";

function InputFileUpload() {
  return (
    <Wrapper>
      <input type="file" id="document-form-file" name="document-form-file" />
      <MdCloudUpload />
    </Wrapper>
  );
}

export default InputFileUpload;
