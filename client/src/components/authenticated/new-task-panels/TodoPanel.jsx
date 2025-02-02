import DatePicker from "../../ui/inputs/DatePicker";
import Input from "../../ui/inputs/Input";
import TextArea from "../../ui/inputs/TextArea";

export default function TodoPanel() {
    return(
        <div className="grid grid-cols-[1fr_1fr] gap-4" style={{ gridTemplateAreas: `"name description" "date description"` }}>
            <Input text="Task Name" type="text" style={{ gridArea: "name" }} />
            <DatePicker text="Due Date" style={{ gridArea: "date" }} />
            <TextArea text="Task Description" style={{ gridArea: "description" }} />
        </div>
    );
}