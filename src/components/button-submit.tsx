import { Button } from "./ui/button";

interface Props {
  button_value: string;
  button_icon: string | any;
}

const ButtonSubmit = (props: Props) => {
  const { button_value, button_icon } = props;

  return (
    <Button className="w-full h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl font-bold text-lg gap-2">
      {button_value} <span>{button_icon}</span>
    </Button>
  );
};

export default ButtonSubmit;
