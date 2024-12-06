import { useEffect, useRef, useState } from "react";
import AdminRenderer from "../../AdminRenderer";
import Page from "../../components/Page";
import PromoBar from "../../components/PromoBar";
import { getAvailableLayouts, getLayout, updateElement } from "../../services/layoutService";
import OffCanvas from "../../components/editable/OffCanvas";
import TextInput from "../../components/editable/TextInput";
import NumberInput from "../../components/editable/NumberInput";
import FileInput from "../../components/editable/FileInput";
import BooleanInput from "../../components/editable/BooleanInput";

const Home = () => {
    const [page, setPage] = useState([]);
    const [applicableLayouts, setApplicableLayouts] = useState([]);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
    const [selectedAppLayout, setSelectedAppLayout] = useState(null);
    const [targetParent, setTargetParent] = useState(null);

    useEffect(() => {
        const init = async () => {
            const layout = await getLayout('home');
            if (layout) setPage(layout);
        };

        const getLayouts = async () => {
            const layouts = await getAvailableLayouts();
            if (layouts) setApplicableLayouts(layouts);
        }

        init();
        getLayouts();
    }, []);

    useEffect(() => {
        setSelectedAppLayout(null);

        if (!isOffCanvasOpen) {
            setTargetParent(null);
        }
    }, [isOffCanvasOpen])

    if (!page) return <div>Please wait...</div>

    const handleChildClick = (e, id) => {
        e.preventDefault();
        console.log(id);
        setTargetParent(id);
        setIsOffCanvasOpen(true);
    }

    const getKeys = (item) => {
        if (!item || item?.length < 1) return [];

        return Object.keys(item);
    }

    const saveChild = async (props) => {
        await updateElement(props, targetParent);
        setIsOffCanvasOpen(false);
    }

    const AddChildLayout = ({ item, type, onSubmit }) => {
        const [properties, setProperties] = useState({ type: type });

        const handleChangeText = (title, value) => {
            setProperties(prev => ({ ...prev, [title]: value }));
        }

        const handleChangeNumber = (title, value) => {
            setProperties(prev => ({ ...prev, [title]: Number(value) }));
        }

        return <>
            {
                getKeys(item).map((key, index) => {
                    let _item = item[key];
                    let props = { id: index, label: _item['DisplayName'], placeholder: _item['Placeholder'] };
                    let type = _item['InputType'];

                    if (!_item["CanWrite"]) return;

                    if (type === 'text') {
                        return <TextInput {...props} onChange={(e) => handleChangeText(key, e.target.value)} />
                    } else if (type === 'number') {
                        return <NumberInput {...props} onChange={(e) => handleChangeNumber(key, e.target.value)} />
                    } else if (type === 'file') {
                        return <FileInput {...props} />;
                    } else if (type === 'boolean') {
                        return <BooleanInput {...props} />
                    }
                })
            }
            <button className='btn btn-outline-success' onClick={() => onSubmit(properties) }>Save</button>
        </>
    }

    return (
        <Page>
            <OffCanvas isOpen={isOffCanvasOpen} onClose={ setIsOffCanvasOpen } title='Add child'>
                {
                    <div className='d-flex flex-column gap-2'>
                        <div className='d-flex flex-column align-items-start'>
                            <small className='text-secondary'>You are adding a child into</small>
                            <div>
                                <small className='text-secondary'>{targetParent}</small>
                            </div>
                        </div>
                        <select className="form-select" value={selectedAppLayout} onChange={(e) => setSelectedAppLayout(e.target.value)} id="exampleSelect1" data-np-intersection-state="observed">
                            <option value={null} selected={true }>Select a layout</option>
                            {getKeys(applicableLayouts).map((key) => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </select>
                        <div>
                            {applicableLayouts[selectedAppLayout] && (
                                <div className='d-flex flex-column gap-2'>
                                    {
                                        <AddChildLayout item={applicableLayouts[selectedAppLayout]} type={selectedAppLayout} onSubmit={saveChild} />
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                }
            </OffCanvas>

            {page && page.length > 0 && page.map(props => <AdminRenderer onAddChildClick={handleChildClick} {...props} />) }

            {page.promotions && page.promotions.length > 0 && (
                <PromoBar image={page.promotions[0].image} clickable={page.promotions[0].isClickable} />
            )}
        </Page>
    )
}

export default Home;