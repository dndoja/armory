import {FunctionComponent, useState} from "react";
import styles from './section.module.scss';
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
    <div className={styles.container}>
        {
            props.title &&
                <div className={styles.titleContainer} >
                     {isCollapsable && <animated.div className={styles.arrow} style={rotateSpring} onClick={onTitleClick}/>}
                     <p className={isCollapsable ? styles.sectionTitleClickable : styles.sectionTitle} onClick={onTitleClick}>{props.title}</p>
                </div>
        }
        <div className={styles.content}>
            <div style={{overflowY: 'hidden', maxHeight: isExpanded ? '100%' : '0'}}>{props.children}</div>
        </div>
    </div>
    )
};

export default Section;