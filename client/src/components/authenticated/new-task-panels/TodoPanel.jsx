import DatePicker from "../../ui/inputs/DatePicker";
import Input from "../../ui/inputs/Input";
import TextArea from "../../ui/inputs/TextArea";

export default function TodoPanel() {
    return(
        <div className="grid grid-cols-[1fr_1fr] gap-2" style={{ gridTemplateAreas: `"name description" "date description"` }}>
            <Input type="text" placeholder="Task Name" style={{ gridArea: "name" }} />
            <DatePicker style={{ gridArea: "date" }} />
            <TextArea placeholder="Task Description" style={{ gridArea: "description" }} />
        </div>
    );
}