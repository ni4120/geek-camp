"use client"

const Entrance = () => {
    const participants = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
        { id: 4, name: "David" },
        { id: 5, name: "Eve" },
        { id: 6, name: "Frank" },
        { id: 7, name: "Grace" },
        { id: 8, name: "Hannah" },
        { id: 9, name: "Ivy" },
        { id: 10, name: "Jack" },
    ];
    return (
        <div className="flex flex-col space-y-10">
            <h2 className="text-3xl font-bold">
                {"[大喜利部屋名]"}部屋です
            </h2>
            <div className="w-full flex flex-col justify-center items-center">
                <h3 className="text-2xl font-semibold mb-4">参加者</h3>
                <div>{"0"}/10</div>
            </div>
            {/* 参加者リストの表示 */}
            <div className="grid grid-cols-2 gap-4">
                {participants.map((participant) => (
                    <div
                        key={participant.id}
                        className="border p-2 text-center"
                    >
                        {participant.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Entrance;