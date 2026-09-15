import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { EmployeeNode, NewEmployeeDto, OrgOverviewStats } from '../models/organization.types'

@Injectable({ providedIn: 'root' })
export class OrganizationApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly staffUrl = this.apiConfig.buildUrl('api/v1/provider-staff')

  private mockEmployees: EmployeeNode[] = [
    {
      id: 'emp-1',
      name: 'Alexander Wright',
      role: 'Chief Executive Officer',
      department: 'Executive',
      email: 'alex.wright@traveller.ai',
      phone: '+1 (555) 019-2834',
      location: 'San Francisco, CA',
      status: 'active',
      directReportsCount: 4,
      compensationTier: 'Exec-1',
      startDate: 'Jan 2023',
      avatarInitials: 'AW',
    },
    {
      id: 'emp-2',
      name: 'Dr. Elena Rostova',
      role: 'VP of AI & Personalization',
      department: 'Engineering',
      email: 'elena.rostova@traveller.ai',
      phone: '+41 22 819 2039',
      location: 'Zurich, Switzerland',
      status: 'active',
      directReportsCount: 8,
      managerId: 'emp-1',
      compensationTier: 'Director-L2',
      startDate: 'Mar 2023',
      avatarInitials: 'ER',
    },
    {
      id: 'emp-3',
      name: 'Marcus Brody',
      role: 'Head of Global Operations',
      department: 'Operations',
      email: 'marcus.brody@traveller.ai',
      phone: '+44 20 7946 0912',
      location: 'London, UK',
      status: 'in_meeting',
      directReportsCount: 6,
      managerId: 'emp-1',
      compensationTier: 'Director-L2',
      startDate: 'May 2023',
      avatarInitials: 'MB',
    },
    {
      id: 'emp-4',
      name: 'Sophia Chen',
      role: 'Director of Product Design',
      department: 'Design',
      email: 'sophia.chen@traveller.ai',
      phone: '+1 (415) 892-0192',
      location: 'San Francisco, CA',
      status: 'active',
      directReportsCount: 3,
      managerId: 'emp-1',
      compensationTier: 'Staff-L1',
      startDate: 'Jun 2023',
      avatarInitials: 'SC',
    },
    {
      id: 'emp-5',
      name: 'Kenji Takahashi',
      role: 'Principal Marketplace Architect',
      department: 'Engineering',
      email: 'kenji.takahashi@traveller.ai',
      phone: '+81 3 5555 0142',
      location: 'Tokyo, Japan',
      status: 'active',
      directReportsCount: 0,
      managerId: 'emp-2',
      compensationTier: 'Principal-L3',
      startDate: 'Sep 2023',
      avatarInitials: 'KT',
    },
    {
      id: 'emp-6',
      name: 'Amara Okafor',
      role: 'Lead Tour Curator & DMC Liaison',
      department: 'Operations',
      email: 'amara.okafor@traveller.ai',
      phone: '+254 20 712 3456',
      location: 'Nairobi, Kenya',
      status: 'on_leave',
      directReportsCount: 2,
      managerId: 'emp-3',
      compensationTier: 'Senior-L2',
      startDate: 'Nov 2023',
      avatarInitials: 'AO',
    },
    {
      id: 'emp-7',
      name: 'Liam O’Connor',
      role: 'Head of Growth & Affiliates',
      department: 'Marketing',
      email: 'liam.oconnor@traveller.ai',
      phone: '+353 1 496 0123',
      location: 'Dublin, Ireland',
      status: 'active',
      directReportsCount: 4,
      managerId: 'emp-1',
      compensationTier: 'Staff-L1',
      startDate: 'Feb 2024',
      avatarInitials: 'LO',
    },
  ]

  listEmployees(): Observable<EmployeeNode[]> {
    return this.http.get<any>(this.staffUrl).pipe(
      map((res) => {
        let items: any[] = []
        if (Array.isArray(res)) items = res
        else if (res?.data?.items) items = res.data.items
        else if (res?.items) items = res.items

        if (items.length === 0) return this.mockEmployees

        return items.map((item, idx): EmployeeNode => ({
          id: item.id || `emp-${idx + 1}`,
          name: item.name || item.displayName || `Staff Member ${idx + 1}`,
          role: item.role ? item.role.replace('_', ' ').toUpperCase() : 'Operator Staff',
          department: item.department || (item.role === 'guide' ? 'Operations' : item.role === 'finance' ? 'Finance' : 'Operations'),
          email: item.email || `staff${idx + 1}@traveller.ai`,
          phone: item.phone || '+1 (555) 012-3456',
          location: item.location || 'Global Remote',
          status: item.status === 'active' ? 'active' : item.status === 'in_meeting' ? 'in_meeting' : 'on_leave',
          directReportsCount: item.directReportsCount || 0,
          managerId: item.managerId,
          compensationTier: 'Staff-L1',
          startDate: '2024',
          avatarInitials: (item.name || 'SM').slice(0, 2).toUpperCase(),
        }))
      }),
      catchError(() => of(this.mockEmployees))
    )
  }

  addEmployee(dto: NewEmployeeDto): Observable<EmployeeNode> {
    const initials = dto.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

    const newEmp: EmployeeNode = {
      id: `emp-${Date.now()}`,
      name: dto.name,
      role: dto.role,
      department: dto.department,
      email: dto.email,
      phone: dto.phone || '+1 (555) 000-0000',
      location: dto.location,
      status: 'active',
      directReportsCount: 0,
      managerId: dto.managerId,
      compensationTier: 'Staff-L1',
      startDate: 'Just now',
      avatarInitials: initials,
    }

    return this.http.post<any>(this.staffUrl, dto).pipe(
      map(() => newEmp),
      catchError(() => of(newEmp))
    )
  }

  getStats(employees: EmployeeNode[]): OrgOverviewStats {
    const totalHeadcount = employees.length
    const departments = new Set(employees.map((e) => e.department))
    const remote = employees.filter((e) => !e.location.includes('San Francisco')).length
    const remotePercentage = totalHeadcount > 0 ? Math.round((remote / totalHeadcount) * 100) : 60

    return {
      totalHeadcount,
      activeDepartments: departments.size,
      remotePercentage,
      retentionRate: 96.4,
    }
  }
}
