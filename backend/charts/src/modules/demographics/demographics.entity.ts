import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('demographics')
export class Demographics {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: false })
    day: Date;

    @Column({ type: 'integer', nullable: true })
    min_age: number | null;

    @Column({ type: 'integer', nullable: true })
    max_age: number | null;

    @Column({ type: 'text' })
    gender: 'MALE' | 'FEMALE';

    @Column({ name: 'a', type: 'integer', nullable: false, default: 0 })
    A: number;

    @Column({ name: 'b', type: 'integer', nullable: false, default: 0 })
    B: number;

    @Column({ name: 'c', type: 'integer', nullable: false, default: 0 })
    C: number;

    @Column({ name: 'd', type: 'integer', nullable: false, default: 0 })
    D: number;

    @Column({ name: 'e', type: 'integer', nullable: false, default: 0 })
    E: number;

    @Column({ name: 'f', type: 'integer', nullable: false, default: 0 })
    F: number;
}
