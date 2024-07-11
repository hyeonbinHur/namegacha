import { BsChatSquareDotsFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as pageAPI from '../utils/api/aws/pageRoutes';
import DetailHeader from '../components/Details/Header/DetailHeader';
import VariableContainer from '../components/Details/Variables/VariableContainer';
import FunctionContainer from '../components/Details/Functions/FunctionContainer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loading from '../assets/svgs/loading.svg';

export default function DetailPage() {
    const params = useParams();
    const [pageId, setPageId] = useState(null);
    const navigate = useNavigate();
    const [selectedIdf, setSelectedIdf] = useState('variable');
    useEffect(() => {
        if (params.pageId) {
            setPageId(params.pageId);
        }
    }, [params]);
    const {
        data: page,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['getPageInfo', pageId],
        queryFn: () => pageAPI.getPage(pageId),
        enabled: !!pageId,
    });
    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedIdf(value);
    };
    if (isLoading)
        return (
            <img src={loading} alt="loading image" className="loading-sub" />
        );
    if (error) {
        navigate('/error');
    }
    return (
        <>
            {page && (
                <div className="detail">
                    <header className="detail--header">
                        <DetailHeader page={page} />
                    </header>
                    <hr className="divider" />
                    <section className="detail--main">
                        <ul className="detail--tab ul">
                            <li className="detail--tab__li">
                                <input
                                    type="radio"
                                    id="variable"
                                    name="detail-tab"
                                    value="variable"
                                    checked={selectedIdf === 'variable'}
                                    onChange={handleChange}
                                    className="detail--tab__radio"
                                />
                                <label
                                    htmlFor="variable"
                                    className="detail--tab__label"
                                >
                                    Variable
                                </label>
                            </li>
                            <li className="detail--tab__li">
                                <input
                                    type="radio"
                                    id="function"
                                    name="detail-tab"
                                    value="function"
                                    checked={selectedIdf === 'function'}
                                    onChange={handleChange}
                                    className="detail--tab__radio"
                                />
                                <label
                                    htmlFor="function"
                                    className="detail--tab__label"
                                >
                                    Function
                                </label>
                            </li>
                        </ul>
                        <div className="detail--content">
                            {selectedIdf === 'variable' && (
                                <section className="detail--content__idf-container">
                                    <VariableContainer
                                        variables={page.variables}
                                        pageId={page.pageId}
                                    />
                                </section>
                            )}
                            {selectedIdf === 'function' && (
                                <section className="detail--content__idf-container">
                                    <FunctionContainer
                                        functions={page.functions}
                                        pageId={page.pageId}
                                    />
                                </section>
                            )}
                        </div>
                    </section>
                    <BsChatSquareDotsFill
                        onClick={() => navigate('/namegacha/')}
                        className="detail--btns"
                    />
                </div>
            )}
        </>
    );
}
