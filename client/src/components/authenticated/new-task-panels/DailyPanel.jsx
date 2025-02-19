import Input from "../../ui/inputs/Input";
import Option from "../../ui/inputs/select/Option";
import Select from "../../ui/inputs/select/Select";
import TextArea from "../../ui/inputs/TextArea";
import DatePicker from "../../ui/inputs/DatePicker";

// This component shows the daily related inputs on the new task pages.
export default function DailyPanel() {
    return(
        <div className="grid gap-4" style={{ gridTemplateAreas: `"name description" "period description" "date gap"` }}>
            <Input type="text" name="name" text="Task Name" style={{ gridArea: "name" }} required={true} />
            <TextArea text="Task Description" name="description" style={{ gridArea: "description" }} />
            <Select text="Period" name="period" style={{ gridArea: "period" }}>
                <Option value="day">Day</Option>
                <Option value="week">Week</Option>
                <Option value="month">Month</Option>
            </Select>
            <DatePicker text="Start Date" name="date" style={{ gridArea: "date" }} />
            <Input text="Every" type="number" name="gap" min="1" defaultValue="1" style={{ gridArea: "gap" }} />
        </div>
    );
}