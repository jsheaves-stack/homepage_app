import { useEffect, useState } from "react";
import deleteIcon from '../../assets/delete_icon.svg';

function SectionItem({ itemName, itemUrl, edit, itemIndex, updateSection, deleteSectionItem }) {
    const [name, setName] = useState(itemName);
    const [url, setUrl] = useState(itemUrl);

    useEffect(() => {
        updateSection({ name, url }, itemIndex);
    }, [name, url, itemIndex]);

    return (
        <div className="Section-item">
            {!edit && <a href={itemUrl}>{itemName}</a>}
            {
                edit &&
                <div className="Section-item-edit">
                    <input placeholder="Enter site name..." type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <input placeholder="Enter site url..." type="text" value={url} onChange={(e) => { setUrl(e.target.value) }} />
                    <div className="Delete-button">
                        <img className="Button" src={deleteIcon} onClick={() => { deleteSectionItem(itemIndex) }} alt="Delete" />
                    </div>
                </div>
            }
        </div>
    )
}

export default SectionItem;