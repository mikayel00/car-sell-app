import { AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

// Schema, what data must be included in creating time
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user ID', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user ID', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user ID', this.id);
  }
}
