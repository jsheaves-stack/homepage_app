import SectionItem from "./sectionItemComponent";
import editIcon from '../../assets/edit_icon.svg';
import addIcon from '../../assets/add_icon.svg';
// import deleteIcon from '../../assets/delete_icon.svg';
import _ from 'lodash';
import { useCallback, useState } from 'react';

function Section({ name, contents, updateHomepage }) {
    const [hover, setHover] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editedHomepage, setEditedHomepage] = useState(contents);

    const updateSection = useCallback((newObject, index) => {
        const updatedHomepage = _.cloneDeep(editedHomepage);
        updatedHomepage[index] = newObject;
        setEditedHomepage(updatedHomepage);
    }, [editedHomepage]);

    const deleteSectionItem = useCallback((index) => {
        const updatedHomepage = _.cloneDeep(editedHomepage);
        updatedHomepage.splice(index, 1);
        setEditedHomepage(updatedHomepage);
    }, [editedHomepage]);

    return (
        <div className="Section">
            <div className="Section-title" onMouseOver={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}>
                <div>
                    {
                        (hover || isEdit) &&
                        <div className="Section-edit">
                            <img className="Edit-button Button" src={editIcon} height={"32px"} width={"32px"} onClick={() => { setIsEdit(!isEdit) }} alt="Edit" />
                            {/* {isEdit && <img src={deleteIcon} alt="" />} */}
                        </div>
                    }
                    <span>{name}</span>
                </div>
            </div>
            <div className={`Section-body${isEdit ? " Section-body-edit" : ""}`}>
                {
                    editedHomepage.map(({ name, url }, index) => (
                        <SectionItem key={index} itemIndex={index} itemName={name} itemUrl={url} edit={isEdit} updateSection={updateSection} deleteSectionItem={deleteSectionItem} />
                    ))
                }

                {isEdit &&
                    <div onClick={() => { updateSection({ name: "", url: "" }, editedHomepage.length) }}>
                        <img className={"Button"} src={addIcon} alt="Add" />
                    </div>
                }

                {isEdit &&
                    <div className="Save-button Button" onClick={() => {
                        setIsEdit(false);
                        updateHomepage(editedHomepage, name);
                    }}>
                        <div>Save</div>
                    </div>
                }
            </div>

        </div>
    );
}

export default Section;
