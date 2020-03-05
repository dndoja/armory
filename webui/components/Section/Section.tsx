import {FunctionComponent, useState} from "react";
import * as css from './section.scss';
import {useSpring, animated} from "react-spring";

type SectionProps = {
    title?: string,
    isCollapsable?: boolean
}

const Section: FunctionComponent<SectionProps> = (props) => {
    const isCollapsable = props.isCollapsable ?? false;
    const [isExpanded,setIsExpanded] = useState(true);

    const rotateSpring = useSpring({
        config: {
          tension: 450,
            delay: 100
        },
        transform: isExpanded ? 'rotate(45deg)' : "rotate(-135deg)"
    });

    const onTitleClick = () => {
        if (isCollapsable){
            setIsExpanded(!isExpanded)
        }
    };

    return (
    <div className={css.container}>
        {
            props.title &&
                <div className={css.titleContainer} >
                     {isCollapsable && <animated.div className={css.arrow} style={rotateSpring} onClick={onTitleClick}/>}
                     <p className={isCollapsable ? css.sectionTitleClickable : css.sectionTitle} onClick={onTitleClick}>{props.title}</p>
                </div>
        }
        <div className={css.content}>
            <div style={{overflowY: 'hidden', maxHeight: isExpanded ? '100%' : '0'}}>{props.children}</div>
        </div>
    </div>
    )
};

export default Section;