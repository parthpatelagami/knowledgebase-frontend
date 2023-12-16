// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Label,
} from "reactstrap";

const SwitchBasic = () => {
  return (
    <div className="form-check form-switch">
      <Input type="switch" name="customSwitch" id="exampleCustomSwitch" />
      <Label for="exampleCustomSwitch" className="form-check-label">
        Active/Deactive
      </Label>
    </div>
  );
};
export default SwitchBasic;
