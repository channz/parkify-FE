

interface HistoryItemsProps {
    date: string;
    name: string;
    location: string;
    price: string;
}

const HistoryLocation = ({date, name, location, price}: HistoryItemsProps) => {
    return (
        
            <div className="flex gap-12 justify-between items-start px-5 pt-2.5 pb-5 mt-4 w-full rounded-2xl shadow-sm bg-stone-50">
                <div className="flex flex-col text-xs text-zinc-500">
                    <div className="text-xs font-semibold text-neutral-900">{date}</div>
                    <div className="mt-3.5">{name}</div>
                    <div>{location}</div>
                </div>
                <div className="text-xs font-semibold text-neutral-900">
                    {price}
                </div>
            </div>
        
    );
};

export default  HistoryLocation;