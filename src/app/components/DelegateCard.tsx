import * as _ from 'lodash';
import { Delegate } from "../delegates/page";

export const DelegateCard = ({ delegate }: { delegate: Delegate }) => {


    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-black">

            <div className="text-center pt-3">
                <img
                    src={`https://tecdn.b-cdn.net/img/new/avatars/${_.random(0, 9)}.webp`}
                    className="mx-auto mb-4 w-24 rounded-lg"
                    alt="Avatar" />
                <h5 className="mb-2 text-xl font-medium leading-tight">{delegate?.name} </h5>
                0x{delegate.address}
                <p className="text-neutral-500 dark:text-neutral-400">{delegate?.title}</p>
            </div>
            <div className="px-6 ">
                <p className="text-gray-700 text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">#software</span>
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">#legal</span>
                <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">#finance</span>
            </div>
        </div>
    )

}

export default DelegateCard;