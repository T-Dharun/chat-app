
const Contact = ({contactList}) => {
    return (
        <div>
            {
                contactList.map((contact) => {
                    return (
                        <div>{contact.name}</div>
                    )
                })
            }
        </div>
    );
};
export default Contact;