/* eslint-disable react/prop-types */
export default function UserMessage({ message }) {
    return (
        <div className="message--user">
            <div className="message--user__message">{message}</div>
        </div>
    );
}
