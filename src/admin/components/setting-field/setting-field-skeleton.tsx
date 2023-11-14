import Skeleton from "../skeleton";

type SettingFieldSkeletonProps = {

}

const SettingFieldSkeleton = ({ }: SettingFieldSkeletonProps) => {
    return (
        <div className="w-full flex flex-col gap-1">
            <div className="w-full flex flex-row gap-2 items-center justify-between">
                <Skeleton className="w-[50%] max-w-[384px] rounded" />
                <Skeleton className="w-[36px] h-[36px] rounded" />
            </div>
            <Skeleton className="w-full h-[36px] rounded" />
            <div className="w-full flex flex-row gap-2 items-center justify-start">
                <Skeleton className="w-[50%] max-w-[384px] rounded" />
            </div>
        </div>
    )
}

export default SettingFieldSkeleton;