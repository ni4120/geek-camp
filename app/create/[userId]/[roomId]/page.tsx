import InRoomButton from "@/components/in-room-button"
import ShareUrlForm from "@/components/share-url-form"

const ShareUrlPage = () => {
    const url = 'https://share-url'
    return (
        <main className="flex flex-col h-full justify-center items-center gap-y-10">
            <h2 className="text-3xl font-bold">部屋のURLを共有しましょう</h2>
            <ShareUrlForm
                url={url}
            />
            <InRoomButton />
        </main>
    )
}
 
export default ShareUrlPage