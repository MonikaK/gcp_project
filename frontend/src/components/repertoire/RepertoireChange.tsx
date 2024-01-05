import Repertoire from "./RepertoirePage";

/**
 * Function representing the component responsible for displaying a repertoire page with editing option,
 * it is visible only for admin role.
 */
const RepertoireChange = () => {
    return (
        <div>
            <Repertoire isAdmin />
        </div>
    );
}

export default RepertoireChange;