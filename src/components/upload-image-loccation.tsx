import { Card, CardContent } from "./ui/card";

interface Props {
    image: string;
}

function ImageLocation ({image}: Props) {
    return (
        <Card className="rounded-3xl">
            <CardContent className="flex">
            <div className="flex gap-5 justify-between px-20 py-10 text-base font-semibold leading-7 bg-white rounded-2xl shadow-sm max-w-[356px] text-zinc-600">
                <img 
                src={image} 
                alt="Add picture" 
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

export default  ImageLocation;