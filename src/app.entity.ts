import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from './book.entity'; // Assurez-vous que ce chemin est correct

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true }) // Assurez-vous que cette ligne est incluse
  bio?: string; // La propriété 'bio' est déclarée ici

  @OneToMany(() => Book, book => book.author) // Définir la relation inverse
  books: Book[];
}
