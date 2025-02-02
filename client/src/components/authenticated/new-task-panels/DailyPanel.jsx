import Input from "../../ui/inputs/Input";
import Option from "../../ui/inputs/select/Option";
import Select from "../../ui/inputs/select/Select";
import TextArea from "../../ui/inputs/TextArea";
import DatePicker from "../../ui/inputs/DatePicker";

export default function DailyPanel() {
    return(
        <div className="grid grid-cols-[1fr_1fr] gap-4" style={{ gridTemplateAreas: `"name description" "period description" "date gap"` }}>
            <Input type="text" text="Task Name" style={{ gridArea: "name" }} />
            <TextArea text="Task Description" style={{ gridArea: "description" }} />
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