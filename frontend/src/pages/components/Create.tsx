import { ChangeEvent, FormEvent,  MouseEvent, useState } from "react";
import useTweeah from "../../hooks/useTweeah";

const CreateTweeah = () => {
    const { createTweeah } = useTweeah();
    const [body, setBody] = useState<string>('')
    const { mutate, error } = createTweeah();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value)
    }

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(e.target);
        
        const datapost = {
            body: body,
        }
        mutate({ datapost })
    }

    return (
        <div className="card gedf-card card-css card-css2">
            <div className="card-body card-body-css">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                        <div className="form-group">
                            <label className="sr-only" htmlFor="message" />
                            <textarea className="form-control bg-black text-area-css" id="message" rows={3} placeholder="What are you thinking?" value={body} onChange={handleChange} style={{color:"white"}}></textarea>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
                        <div className="py-4"></div>
                    </div>
                </div>
                <div className="btn-toolbar justify-content-between">
                    <div className="btn-group">
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-css">Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTweeah;