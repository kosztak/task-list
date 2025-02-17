export default function GroupRankingPanel({ members }) {
    function getRankings() {
        members.sort((a, b) => a.point < b.point);
        return members.map((member, index) => 
            <div className="bg-white p-2 rounded flex justify-between">
                <p className="font-bold text-lg">{index+1}</p>
                <p className="text-lg">{member.username}</p>
                <p className="font-bold text-lg">{member.point} pt</p>
            </div>
        )
    }

    return(
        <div className="bg-gray-900 p-4 rounded-lg flex flex-col gap-8">
            <p className="text-amber-300 text-2xl font-bold text-center">Rankings</p>
            <div className="flex flex-col gap-2">
                {getRankings()}
            </div>
        </div>
    )
}