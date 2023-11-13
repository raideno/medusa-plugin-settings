import { clx } from "@medusajs/ui";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {

}

const Skeleton = ({
    className,
    ...props
}: SkeletonProps) => {
    return (
        <div
            className={clx("animate-pulse rounded-md bg-grey-10", className)}
            {...props}
        />
    );
};

export default Skeleton;