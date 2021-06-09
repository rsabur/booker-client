import DjDetails from "./DjDetails";

function DjCard({ djs }) {

    console.log(djs)



    const djCardInfo = djs.map(dj => <DjDetails key={dj.id} {...dj} />)


    return (
        <>
            {djCardInfo}
        </>
    )
}


export default DjCard