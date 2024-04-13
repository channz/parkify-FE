import { Settings } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  content: string;
}

const ManagePark = (props: Props) => {
  const { id, content } = props;

  return (
    <Link to={`/parking-slot/${id}`}>
      <Card className="flex flex-col rounded-3xl drop-shadow-md">
        <CardContent className="px-4 py-6 space-y-5">
          <div className="flex">
            <p className="font-semibold text-xl">{content}</p>
            <Settings className="my-auto ms-auto" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ManagePark;
