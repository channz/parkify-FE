import { Card, CardContent } from "./ui/card";

interface Props {
    edit: string;
}

function EditSlot ({edit}: Props) {
    return (
        <Card className="rounded-3xl">
            <CardContent className="flex">
            <div className="flex gap-5 justify-between px-20 py-10 text-base font-semibold leading-7 bg-white rounded-2xl shadow-sm max-w-[356px] text-zinc-600">
                <img 
                src={edit} 
                className="shrink-0 w-14 aspect-square" 
                />
                <div className="my-auto">
                    Add Picture
                </div>
            </div>
            </CardContent>
        </Card>
    );
};

export default EditSlot;