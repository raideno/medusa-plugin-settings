import { Text } from "@medusajs/ui";

type ErrorTextProps = {
    children: string;
}

const ErrorText = ({
    children
}: ErrorTextProps) => {
    return (
        <div className="w-full py-8 flex flex-col items-center justify-center">
            <Text className="txt-medium font-normal font-sans txt-medium inter-base-regular text-grey-50">{children}</Text>
        </div>
    )
}

export default ErrorText;