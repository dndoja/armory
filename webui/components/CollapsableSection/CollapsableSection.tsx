import {FunctionComponent, useState} from "react";
import * as css from './collapsable_section.scss';
import {useSpring, animated} from "react-spring";

type CollapsableSectionProps = {
    title: string,
}

const CollapsableSection: FunctionComponent<CollapsableSectionProps> = (proppers) => {
    const [isExpanded,setIsExpanded] = useState(true);

    const rotateSpring = useSpring({
        config: {
          tension: 450,
            delay: 100
        },
        transform: isExpanded ? 'rotate(45deg)' : "rotate(-135deg)"
    });

    return (
    <div className={css.container}>
        <div className={css.titleContainer} onClick={() => setIsExpanded(!isExpanded)}>
            <animated.div className={css.arrow} style={rotateSpring}/>
            <p className={css.sectionTitle} >{proppers.title}</p>
        </div>
        <div className={css.content}>
            <div style={{overflowY: 'hidden', maxHeight: isExpanded ? '100%' : '0'}}>{proppers.children}</div>
        </div>
    </div>
    )
};

export default CollapsableSection;