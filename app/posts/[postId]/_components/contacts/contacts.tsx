"use client";
import ContactModal from "@/components/modals/contact-modal";
import { ConversationsModal } from "@/components/modals/conversations-modal";
type Props = {
  phoneNo: string;
  userId: string;
};

const Contacts = ({ phoneNo, userId }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3  ">
      <ContactModal phoneNo={phoneNo} />
      {/* TODO: Create conversation ui */}
      <ConversationsModal userId={userId} />
    </div>
  );
};

export default Contacts;
