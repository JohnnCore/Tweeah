import React, { useState } from "react";

import useTweeah from "../hooks/useTweeah";

const TweeahCreate = () => {
    const {sendCreate} = useTweeah(0, false, false, false)

    const [campBody, setCampBody] = useState("");
    
    return (
        <div>
            <div className="col">
                <label htmlFor="body">Body </label>
                <input id="body" type="text" className="form-control" placeholder="Body" value={campBody} onChange={value => setCampBody(value.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={() => sendCreate(campBody)}>Submeter</button>
        </div>
    )
}

export default TweeahCreate;