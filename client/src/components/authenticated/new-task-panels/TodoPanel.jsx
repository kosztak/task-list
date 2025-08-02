import DatePicker from "components/ui/inputs/DatePicker";
import Input from "components/ui/inputs/Input";
import TextArea from "components/ui/inputs/TextArea";

export default function TodoPanel() {
    return(
        <div className="grid gap-4" style={{ gridTemplateAreas: `"name description" "date description"` }}>
            <Input text="Task Name" name="name" type="text" style={{ gridArea: "name" }} required={true} />
            <DatePicker text="Due Date" name="date" style={{ gridArea: "date" }} />
            <TextArea text="Task Description" name="description" style={{ gridArea: "description" }} />
        </div>
    );
}