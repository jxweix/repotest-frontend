import { Title, Text, Container} from '@mantine/core';
import classes from "./NotFoundTitle.module.css";

export default function page() {

  return (
    <>
      <Container className={classes.root}>
        <div className={classes.label}>Access Blocked Broswer LINE</div>
        <Title className={classes.title}>ไม่สามารถเข้าสู่ระบบผ่านเบราเซอร์ไลน์ได้</Title>
        <Text c="dimmed" size="md" ta="center" className={classes.description}>
          นี่เป็นข้อแนะนำสำหรับการเข้าใช้งานเว็บไซต์ กรุณาเข้าใช้งานผ่านเบราเซอร์ในคอมพิวเตอร์ เช่น Chrome, Edge หรือ Browser อื่น ๆ
        </Text>
      </Container>
    </>
  );
}
