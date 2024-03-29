import { Button } from "./ui/button";

interface Props {
  button_value: string;
}

const ButtonSubmit = (props: Props) => {
  const { button_value } = props;

  return (
    <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl font-bold text-lg">
      {button_value}
    </Button>
  );
};

export default ButtonSubmit;
